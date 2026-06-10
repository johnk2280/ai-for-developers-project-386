import pytest

from backend.domain.exc import InvariantError

from .conftest import make_booking


def test_empty_guest_name_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(guest_name='')


def test_blank_guest_name_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(guest_name='   ')


def test_empty_guest_email_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(guest_email='')


def test_blank_guest_email_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(guest_email='   ')
