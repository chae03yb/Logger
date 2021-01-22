import requests
import json

Configure = json.load(fp=open("../Data/Configure.json", "r"))

class Logger:
    def writeLog(self, data):
        """
        Parameter:
            data: string
            log data

        send POST request then write log
        """
        if data is None:
            return "기록할 데이터가 필요합니다."
        else:
            res = requests.post(f"http://{Configure["hostname"]}:{Configure["Port"]}/Log", data="test")
            
            if res.status_code == 500:
                return "Internal server error"
            elif res.status_code == 200:
                return "OK"

    def readLog(self, line:int=None):
        """
        Parameter:
            line:
            read line

        send GET request then read log data 
        """
        res = requests.get(f"http://{Configure["hostname"]}:{Configure["Port"]}/Log")
        if line is None:
            pass