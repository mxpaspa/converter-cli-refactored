# converter-cli

A CLI application that makes real-time currency conversions

## Installation using :package: npm

#### 1. Install Node.js [HERE](https://nodejs.org/en/download/).
#### 2. Open your terminal.
#### 3. Type: `npm install -g converter-cli`.
#### 4. Wait for NPM to install this package on your computer.
#### 5. You can now access converter-cli with the from anywhere in your terminal by typing `converter`

```
converter
```

## Usage

#### 1. Create a user:

```
converter create-user username password
```
#### 2. Login and run your first conversion: You will be prompted for your credentials. Once you are authenticated follow the prompts and enter the currencies you want to exchange by their symbol. For example `USD` or `EUR`

```
converter login <username> <password>
```

#### 3. Retrieve your conversion history: this will show you the last 5 conversions you have executed
```
converter logs <username> <password>
```
#### 4. In application help: enter  
```
converter help
```


## Available Currencies

See [supportedCurrencies.json](https://github.com/mxpaspa/currency-converter-cli/blob/master/supportedCurrencies.json) file.

## Third Party Technologies Used:

- [mlab.com](https://mlab.com/welcome/) for providing great and simple conversion library.
- [fixer.io](http://fixer.io/) for providing fast currency conversion API.

## License

[MIT](https://opensource.org/licenses/MIT) © Anthony Kepinski

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fxxczaki%2Fcash-cli.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fxxczaki%2Fcash-cli?ref=badge_large)
