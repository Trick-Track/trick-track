import pytest
from django.contrib.auth.models import User
from django.urls import reverse_lazy


test_user = {
    "username": "john",
    "email": "lennon@thebeatles.com",
    "password": "yellowsubmarine",
}


def test_main_page(client):
    url = reverse_lazy("home")
    response = client.get(url)
    assert response.status_code == 200


@pytest.mark.django_db
def test_user_registration(client):
    expected = {
        "username": "john",
        "email": "lennon@thebeatles.com",
        "password": "yellowsubmarine",
    }
    url = reverse_lazy("users")
    response = client.post(url, test_user, format="json")
    assert response.json() == expected
    assert User.objects.count() == 1
