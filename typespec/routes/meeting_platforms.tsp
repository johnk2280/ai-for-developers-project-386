import "@typespec/http";

using TypeSpec.Http;

namespace CallCalendar;

@route("/v1/meeting-platforms")
interface MeetingPlatforms {
    @get list(): MeetingPlatform[];

    @post create(@body body: MeetingPlatformCreate): {
        @statusCode statusCode: 201;
        @body platform: MeetingPlatform;
    };

    @get read(@path id: string):
        | MeetingPlatform
        | {
              @statusCode statusCode: 404;
          };

    @put update(@path id: string, @body body: MeetingPlatformUpdate):
        | MeetingPlatform
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
