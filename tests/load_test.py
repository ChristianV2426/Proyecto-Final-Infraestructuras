from locust import HttpUser, task, between, SequentialTaskSet
from datetime import datetime


class Tasks(SequentialTaskSet):
    @task
    def create_users(self):
        data = {
            "project_name": f"Proyecto {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
            "project_description": "",
            "start_date": "2024-06-10"
        }

        self.client.post("api/projects/", json=data)

    @task
    def get_users(self):
        self.client.get("api/projects/")


class WebsiteUser(HttpUser):
    wait_time = between(1, 2)

    tasks = [Tasks]
