# ⏰ Rose Alarm Clock 
VueJs application to control Rose's alarm clock. When the application starts, it looks for an IP address in the localStorage. 
If no IP address is stored, the user must enter one.

Once the IP address is entered and validated, the application tries to connect to the alarm 
clock via the sockets. If the connection is established, the user can then set the alarm clock by
recording the wake-up and bedtime from the menu.

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
