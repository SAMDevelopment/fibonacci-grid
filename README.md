# Fibonacci Grid Assessment

A small app based on the following assignment:
> Create a grid of 50x50. When clicking a cell, all cells in that row and column update their counter by 1 and light up yellow for a short time. When 5 fibonacci sequence numbers align, light them up green for a short time and set their values to 0.

## Running the app

Make sure you have Docker installed and run the following commands:

```bash
./app.sh setup
./app.sh up
```

## Commands

There is a helper script to work with the Docker container for this application. Below is a list of available commands.

- `up` - Start the dev server that compiles and serves the app.
- `setup|update` - Install or update dependencies.
- `yarn <args>` - Run a yarn command inside the container.
- `node <args>` - Run a node command inside the container.
- `vue <args>` - Run a Vue CLI command inside the container.

Aside from these commands, all `docker-compose` commands can be used. For example: `./app.sh down` to shut down the application.

## Notes

#### Refactoring

Now that there is a first working version with tests for the fibonacci methods, I would start refactoring them. They became a bit unruly after working through edge cases. The tests also allow for refactoring for speed if necessary.

#### Animations

The animations are currently very simple, but set up in way that they can easily be extended and adjusted. This is something that could be enhanced when more time is invested in the app.
