import json
import sys

def assert_logs(log_json) -> dict:
    print("Asserting logs \n\n\n")
    assessment_result = {}
    test_no = 1
    
    # Process Cypress tests
    for test in log_json['cypress']['runs'][-1]['tests']:
        if len(test['title']) >= 3:
            title = test['title'][1] + " - " + test['title'][2]
        else:
            title = " - ".join(test['title'])
        
        if(test['attempts'][-1]['state']=='failed'):
            tc = f"Test Case {test_no}: {title}"
            status = "TEST_STATUS_FAILURE"
        elif(test['attempts'][-1]['state']=='passed'):
            tc = f"Test Case {test_no}: {title}"
            status = "TEST_STATUS_SUCCESS"
        else:
            tc = f"Test Case {test_no}: {title}"
            status = "TEST_STATUS_SKIPPED"
        test_no += 1
        print(f"{tc}\nResults: {status}\n---------------------------------------------")
        assessment_result[tc] = status

    # Process Jest tests
    for test_suite in log_json['jest']['testResults']:
        for test in test_suite['assertionResults']:
            tc = f"Test Case {test_no}: {test['fullName']}"
            if test['status'] == 'failed':
                status = "TEST_STATUS_FAILURE"
            elif test['status'] == 'passed':
                status = "TEST_STATUS_SUCCESS"
            else:
                status = "TEST_STATUS_SKIPPED"
            test_no += 1
            print(f"{tc}\nResults: {status}\n---------------------------------------------")
            assessment_result[tc] = status

    return assessment_result

if __name__ == "__main__":
    combined_json_path = sys.argv[1]
    print("Opening combined results")
    with open(combined_json_path, 'r', encoding='utf-8') as f:
        log_json = json.load(f)
    print("Reading combined results done")
    assessment_result = assert_logs(log_json)
    print("Writing into assessment_results.json")
    with open("assessment_result.json", 'w+', encoding='utf-8') as f:
        json.dump(assessment_result, f, indent=4)
