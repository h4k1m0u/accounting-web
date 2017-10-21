# Angular installation

## Tutorial
[On Youtube](https://www.youtube.com/watch?v=DlkR2n4SMMk)

## Commands
1. Install `npm`: `$ sudo pacman -S npm`
2. Change `npm` default directory (permissions issue):

```sh
$ mkdir ~/.node_modules
$ npm config set prefix ~/.node_modules
$ echo 'export PATH=~/.node_modules/bin:PATH' >>  ~/.bashrc
$ source ~/.bashrc
$ ng
```

2. Install `angular-cli`: `npm install -g @angular/cli`
3. Install `rxjs`: `npm install -g rxjs`
4. Create a new project: `ng new <project-name>`
5. Run the server: `ng serve`
6. Create a new component: `ng generate component <component-name>`
7. Create a new service: `ng generate service <service-name>`

# Installation of this repo

Just replace the `/src` folder using the content of this repo

# Deploy app to server

```sh
$ ng build --prod
```

And a `dist` folder will be created at the root of the project.
