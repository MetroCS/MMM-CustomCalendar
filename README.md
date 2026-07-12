# MMM-CustomCalendar

A [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) calendar module, derived from
the default `calendar` module, that adds per-instance and per-calendar **formatting controls**
(font sizes, line height, and spacing) directly in `config.js`, so that no CSS editing is required.

This facilitates running several MagicMirror instances (or several calendar blocks within one
instance) simultaneously, each with its own look, without maintaining separate CSS overrides.

## Credit

This module is a derivative work of the excellent default
[`calendar`](https://github.com/MagicMirrorOrg/MagicMirror/tree/master/modules/default/calendar)
module that ships with MagicMirror² core, created by Michael Teeuw and the MagicMirror²
contributors. All calendar-fetching, parsing, and rendering logic originates there. This module
only adds the configurable styling layer described below. Enormous thanks to that project and its
maintainers. See [`LICENSE`](./LICENSE) for the retained and updated copyright notice.

This is a standalone copy, not a tracked fork, so it can evolve independently and isn't expected
to stay in lockstep with upstream changes.

## Installation

```sh
cd ~/MagicMirror/modules
git clone https://github.com/<your-org>/MMM-CustomCalendar.git
cd MMM-CustomCalendar
npm install --omit=dev
```

Then add the module information to `config.js` like any other module:

```js
{
  module: "MMM-CustomCalendar",
  position: "top_left",
  config: {
    calendars: [
      {
        symbol: "calendar-check",
        url: "https://example.com/calendar.ics"
      }
    ]
  }
}
```

## Configuration

### Original calendar options

Every configuration option from the stock `calendar` module is supported unchanged
(`maximumEntries`, `maximumNumberOfDays`, `timeFormat`, `customEvents`, `colored*` options,
per-calendar `color`/`symbol`/`auth`, etc.). See the
[MagicMirror² calendar docs](https://docs.magicmirror.builders/modules/calendar.html) for the
full list. None of that behavior has changed.

### New formatting options

These can be set at the **instance level** (applies to every calendar in that module instance)
and/or **overridden per calendar** (inside an entry in the `calendars` array). A per-calendar
value always wins. If neither is set, the module falls back to its stylesheet default (identical
to stock `calendar` behavior).

| Option | Example | Applies to |
|---|---|---|
| `fontSize` | `"28px"` | General fallback size for rows not covered by a more specific option below (date headers, location line) |
| `titleFontSize` | `"28px"` | Event title text |
| `timeFontSize` | `"24px"` | Event time/date text |
| `symbolFontSize` | `"30px"` | Event symbol/icon |
| `lineHeight` | `"1.25"` | Line height of each event row |
| `maxTitleLength` | `60` | Max title characters before truncation (already existed instance-wide in stock module; now also overridable per calendar) |
| `symbolTitleSpace` | `"25px"` | Horizontal space between the symbol and the title |
| `titleDateSpace` | `"30px"` | Horizontal space between the title and the time/date |

**Instance-level example:**

```js
{
  module: "MMM-CustomCalendar",
  position: "top_left",
  config: {
    fontSize: "28px",
    titleFontSize: "28px",
    timeFontSize: "24px",
    symbolFontSize: "30px",
    lineHeight: "1.25",
    maxTitleLength: 60,
    symbolTitleSpace: "25px",
    titleDateSpace: "30px",
    calendars: [
      { symbol: "calendar-check", url: "https://example.com/work.ics" },
      { symbol: "house", url: "https://example.com/home.ics" }
    ]
  }
}
```

**Per-calendar override example** — the second calendar renders smaller and tighter than the
instance default set above:

```js
calendars: [
  { symbol: "calendar-check", url: "https://example.com/work.ics" },
  {
    symbol: "house",
    url: "https://example.com/home.ics",
    fontSize: "18px",
    titleFontSize: "18px",
    timeFontSize: "16px",
    maxTitleLength: 30
  }
]
```

### How the styling is applied

Resolved values are written as **inline styles** directly on each event's title, time, and
symbol elements at render time (the same override pattern the stock module already uses for
per-calendar `color`/`symbol`/`class` configuration). Nothing is written to the shared CSS file, so:

- Two calendar instances in the same `config.js` can look completely different.
- Two separate MagicMirror *processes* sharing this same `modules/` directory never affect each
  other's styling, since each process renders from its own in-memory config.

## Multiple calendar blocks in one `config.js`

This is fully supported, as with the stock module.
Just add multiple `{ module:
"MMM-CustomCalendar", ... }` blocks, each with its own `config`.

## License

MIT — see [`LICENSE`](./LICENSE)  
Retains the original MagicMirror² copyright notice with a new copyright line for this derivative work.

This program is free software: you can redistribute it and/or modify
it under the terms of the [GNU General Public License](LICENSE) as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
