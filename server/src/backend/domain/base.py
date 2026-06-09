from abc import ABC
from abc import abstractmethod
from collections.abc import Mapping
from typing import Any
from uuid import UUID


class DomainModel(ABC):
    __slots__ = ()

    def __repr__name__(self) -> str:
        return self.__class__.__name__

    def __repr__str__(self, separator: str) -> str:
        props = (
            (name, getattr(self, name))
            for name, obj in self.__class__.__dict__.items()
            if isinstance(obj, property)
        )
        return separator.join(f'{k}={v!r}' for k, v in props)

    def __repr__(self) -> str:
        return f'{self.__repr__name__()}({self.__repr__str__(", ")})'

    def to_dict(self) -> Mapping[str, Any]:
        cls_name = self.__class__.__name__
        msg = (
            f'The method "to_dict" is not implemented in the {cls_name} class'
        )
        raise NotImplementedError(msg)

    @property
    @abstractmethod
    def pk(self) -> tuple[UUID] | UUID:
        pass
