ssh -i ~/.ssh/ubuntu_box_key.pem ubuntu@18.236.68.125

### Setting up the proxy and tunnel using EC2 and OpenSSH:
1. Configure inbound connection rules for the security group associated with the EC2 instance to allow all traffic for the SSH (20), HTTP (80), and HTTPS (443) ports.  Also add a Custom TCP Rule for port 8080 to allow all incoming traffic.
2. Outbound connection rules should allow all traffic. 
3. Add this to /etc/ssh/sshd_config:
```
AllowTcpForwarding yes
GatewayPorts yes
```
4. Setup the ssh tunnel between port 8080 on the remote server and port 5050
on the local machine:
`ssh -v -i ~/.ssh/ubuntu_box_key.pem -R 8080:localhost:5050 ubuntu@18.236.68.125`
5. To test the connection, setup netcat to listen on port 5050:
`netcat -l -p 5050`
And then send some text via TCP to port 8080 of the remote server:
`echo “Please work, please work...” | nc -v 18.236.68.125 8080`
The terminal with the netcat listener will receive and log text when the connection
is successful.
6. Once the above test passes, fire up the proxy with `node app.js` and fire a request
off to `http://18.236.68.125:8080`.

### Setting up the proxy and tunnel using ngrok
1. Start proxy server: `node app.js`
2. Start ssh tunnel: `ngrok http 5050`

### Helpful Links
- https://github.com/nodejitsu/node-http-proxy
- https://github.com/nodejitsu/node-http-proxy/issues/1083
- https://dashboard.ngrok.com/get-started#
- https://medium.com/botfuel/how-to-expose-a-local-development-server-to-the-internet-c31532d741cc
- http://www.randomshouting.com/2013/03/21/How-to-expose-your-server-to-the-Internet.html