class DomainError(Exception):
    """Base class for all domain exceptions."""


class InvariantError(DomainError):
    """Raised when an object invariant is violated during construction."""


class IllegalStateError(DomainError):
    """Raised when an operation is invalid for the object's current state."""


class IntegrityError(DomainError):
    """Raised when a data integrity constraint is violated."""


class BusinessRuleError(DomainError):
    """Raised when a business rule is violated."""
