from locust import HttpUser, task, between, SequentialTaskSet
from datetime import datetime
import random
import string

class Tasks(SequentialTaskSet):
    @task
    def create_projects(self):
        caracteres = string.ascii_letters + string.digits
        string_random = ''.join(random.choice(caracteres) for i in range(5))
        data = {
            "project_name": f"Proyecto {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} {string_random} ",
            "project_description": "",
            "start_date": "2024-06-10"
        }

        self.client.post("api/projects/", json=data)

    @task
    def get_projects(self):
        self.client.get("api/projects/")


class WebsiteUser(HttpUser):
    wait_time = between(1, 2)

    tasks = [Tasks]
