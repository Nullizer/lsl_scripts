### Installation instructions

```sh
# Install nodejs v15
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs
# Download source
git clone https://github.com/Nullizer/lsl_scripts.git
# Setup
cd lsl_scripts
npm install --production
cp config_example.js config.js
```

### Configure

Modify config.js via vim, nano or any other text editors, fill SECRET_KEY and Load balancer ID etc.

### Test

```sh
node ip_add.js # Add this machine's IP to Load balancer
```

```sh
node ip_all_del.js # Delete all ips on load balancer's every backends
```

If works, add command to crontab if needed.
