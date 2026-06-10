import "@typespec/http";

using TypeSpec.Http;

namespace CallCalendar;

@route("/v1/event-types")
interface EventTypes {
    @get list(): EventType[];

    @post create(@body body: EventTypeCreate): {
        @statusCode statusCode: 201;
        @body eventType: EventType;
    };

    @get read(@path id: string):
        | EventType
        | {
              @statusCode statusCode: 404;
          };

    @put update(@path id: string, @body body: EventTypeUpdate):
        | EventType
        | {
              @statusCode statusCode: 404;
          };

    @delete remove(@path id: string):
        | {
              @statusCode statusCode: 204;
          }
        | {
              @statusCode statusCode: 404;
          };
}
