__author__ = "Julian Vega"

""" Sample usage of firebase"""

import psutil
import threading
from firebase import firebase

CPU_NUMBER = psutil.cpu_count(logical=False)
FIREBASE_URL = 'https://<your-firebase-app>.firebaseio.com/'

def save_cpu_usage():
    fb = firebase.FirebaseApplication(FIREBASE_URL, None)
    usage = psutil.cpu_percent(interval=1, percpu=True)
    cpu ={}
    for k in range(CPU_NUMBER):
        cpu[str(k)]=usage[k]
        path = '/cpu'
    result = fb.put(path,"/",cpu)
    threading.Timer(1.0,save_cpu_usage).start()


save_cpu_usage()
