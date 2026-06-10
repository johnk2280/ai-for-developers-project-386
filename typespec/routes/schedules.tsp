import "@typespec/http";

using TypeSpec.Http;

namespace CallCalendar;

@route("/v1/owners/{ownerId}/schedule")
interface Schedules {
    @get get(@path ownerId: string):
        | Schedule
        | {
              @statusCode statusCode: 404;
          };

    @put update(@path ownerId: string, @body body: ScheduleUpdate):
        | Schedule
        | {
              @statusCode statusCode: 404;
          };
}

@route("/v1/owners/{ownerId}/schedule/rules")
interface AvailabilityRules {
    @get list(@path ownerId: string): AvailabilityRule[];

    /** Replace the full set of rules (one per weekday) */
    @put replace(
        @path ownerId: string,
        @body body: AvailabilityRuleWrite[],
    ): AvailabilityRule[];
}

@route("/v1/owners/{ownerId}/schedule/overrides")
interface AvailabilityOverrides {
    @get list(@path ownerId: string): AvailabilityOverride[];

    @post create(
        @path ownerId: string,
        @body body: AvailabilityOverrideCreate,
    ): {
        @statusCode statusCode: 201;
        @body override: AvailabilityOverride;
    };

    @put update(
        @path ownerId: string,
        @path date: plainDate,
        @body body: AvailabilityOverrideUpdate,
    ):
        | AvailabilityOverride
        | {
              @statusCode statusCode: 404;
          };

    @delete remove(@path ownerId: string, @path date: plainDate):
        | {
              @statusCode statusCode: 204;
          }
        | {
              @statusCode statusCode: 404;
          };
}

@route("/v1/owners/{ownerId}/schedule/bookings")
interface ScheduleBookings {
    @get list(@path ownerId: string): Booking[];

    @post create(@path ownerId: string, @body body: BookingCreate): {
        @statusCode statusCode: 201;
        @body booking: Booking;
    };

    @get read(@path ownerId: string, @path id: string):
        | Booking
        | {
              @statusCode statusCode: 404;
          };

    @put update(
        @path ownerId: string,
        @path id: string,
        @body body: BookingUpdate,
    ):
        | Booking
        | {
              @statusCode statusCode: 404;
          };

    @delete remove(@path ownerId: string, @path id: string):
        | {
              @statusCode statusCode: 204;
          }
        | {
              @statusCode statusCode: 404;
          };
}
