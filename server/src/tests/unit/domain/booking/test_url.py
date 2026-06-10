import pytest

from backend.domain.exc import InvariantError

from .conftest import make_booking


def test_empty_url_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(url='')


def test_blank_url_raises() -> None:
    with pytest.raises(InvariantError):
        make_booking(url='   ')
