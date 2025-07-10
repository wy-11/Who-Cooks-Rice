import webview
import logic

logic.load_data()

class Api:
    def get_cookers(self):
        return logic.cookers

    def has_cookers(self):
        return logic.has_cookers()

    def add_cooker(self, name):
        logic.add_cooker(name)
        return True

    def decide_next_cooker(self):
        return logic.decide_cooker()

    def reset_data(self):
        logic.reset_data()
        return True

if __name__ == '__main__':
    api = Api()
    webview.create_window("Who Cooks the Rice Today?", "Web/index.html", js_api=api)
    webview.start() # debug=True