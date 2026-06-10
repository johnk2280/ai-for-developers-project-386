import "@typespec/http";
import "@typespec/openapi3";

import "./models/common.tsp";
import "./models/owner.tsp";
import "./models/event_type.tsp";
import "./models/meeting_platform.tsp";
import "./models/booking.tsp";
import "./models/schedule.tsp";

import "./routes/owners.tsp";
import "./routes/event_types.tsp";
import "./routes/meeting_platforms.tsp";
import "./routes/schedules.tsp";

using TypeSpec.Http;

@service(#{ title: "CallCalendar API" })
namespace CallCalendar;
