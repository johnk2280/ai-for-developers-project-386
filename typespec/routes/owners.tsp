import "@typespec/http";

using TypeSpec.Http;

namespace CallCalendar;

@route("/v1/owners")
interface Owners {
    @get list(): Owner[];

    @post create(@body body: OwnerCreate): {
        @statusCode statusCode: 201;
        @body owner: Owner;
    };

    @get read(@path id: string):
        | Owner
        | {
              @statusCode statusCode: 404;
          };

    @put update(@path id: string, @body body: OwnerUpdate):
        | Owner
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
