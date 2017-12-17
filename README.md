# WHITEBOARD TIME MACHINE

## SETUP

- `yarn`
- Start Webpack, `yarn run start:dev`
- Start development server, `yarn run start:dev`

## TIPS

- `/displays` for insight into active rooms and users
- `/wbtm` create a new room and user.
- `/wbtm/:roomid?` return to a previous room, create a new user.
- `/wbtm/:roomid?/:userid?` return to a previous room and previous user

```
  {
    [roomid]: {
      [userid]: {
        roomid,
        userid,
        ephemeralStore: [],
        lines: [],
      },
    }
  }
```
