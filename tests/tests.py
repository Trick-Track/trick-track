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
    }
    url = reverse_lazy("register")
    response = client.post(url, test_user, format="json")
    assert response.json() == expected
    assert User.objects.count() == 1


@pytest.mark.django_db
def test_user_registration_for_registered_user(client):
    User.objects.create_user(**test_user)
    expected = {
        "username": ["A user with that username already exists."],
        "email": ["This field must be unique."],
    }
    url = reverse_lazy("register")
    response = client.post(url, test_user, format="json")
    assert response.json() == expected
    assert User.objects.count() == 1


@pytest.mark.django_db
def test_obtain_login_token(client):
    User.objects.create_user(**test_user)
    url = reverse_lazy("login")
    response = client.post(url, test_user, format="json")
    assert "access" in response.json()
    assert "refresh" in response.json()


@pytest.mark.django_db
def test_obtain_login_token_with_invalid_credentials(client):
    User.objects.create_user(**test_user)
    url = reverse_lazy("login")
    invalid_data = {
        "username": "john",
        "email": "lennon@thebeatles.com",
        "password": "REDsubmarine",
    }
    expected_response = {"detail": "No active account found with the given credentials"}
    response = client.post(url, invalid_data, format="json")
    assert expected_response == response.json()


@pytest.mark.django_db
def test_refresh_login_token(client):
    User.objects.create_user(**test_user)
    url = reverse_lazy("login")
    response = client.post(url, test_user, format="json")
    token_refresher = response.json()["refresh"]
    url = reverse_lazy("token_refresh")
    response = client.post(url, {"refresh": token_refresher}, format="json")
    assert "access" in response.json()
