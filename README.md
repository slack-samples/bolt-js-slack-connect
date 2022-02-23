# 🤖 Slack Connect Bot 🤖
<p align="center">

[![Add App to Channel](https://user-images.githubusercontent.com/10428517/155399298-a7784e0a-3b13-42b3-a3e4-96217efbd0d9.gif)](https://user-images.githubusercontent.com/10428517/155399298-a7784e0a-3b13-42b3-a3e4-96217efbd0d9.gif)
</p>

This project aims to speed up the time to understand & implement automations with [Slack Connect APIs](https://api.slack.com/apis/connect). This project aims to be the baseline
on which a few different automations can be built:

* Disconnect channels automatically (based on a date picked at channel creation time)
* Upload remote files into the app, keeping all information related to the 
approval of a channel in one place
* Customize org settings for auto approval to speed up creating multiple 
channels between the same two organizations 

# Steps 
1. [App Configuration](#step-1-app-configuration)
2. [Install the App](#step-2-install-the-app)
3. [Add the App to a Channel](#step-3-add-the-app-to-a-channel)
4. [Send a Slack Connect Invite](#step-4-send-a-slack-connect-invite)
5. [Accept the Slack Connect Invite](#step-5-accept-the-slack-connect-invite)
6. [Approve the Slack Connect Invite](#step-6-approve-the-slack-connect-invite)
7. [Disconnect the Channel](#step-7-disconnect-the-channel) 
8. [Conclusion](#conclusion) 

## Step 1. App Configuration

#### Create a Slack App

1. Open [https://api.slack.com/apps/new](https://api.slack.com/apps/new) and choose "From an app manifest"
2. Choose the workspace you want to install the application to
3. Copy the contents of [manifest.json](./manifest.json) into the text box that says `*Paste your manifest code here*` (within the JSON tab) and click _Next_. Make sure to change the URLs on the `manifest.json` in three
specific places, as shown in the screenshot below.

![changeManifest](https://user-images.githubusercontent.com/10428517/155407272-44a2eaf9-e735-453f-a9c7-18c21004a037.png)

4. Review the configuration and click _Create_
5. Click _Install to Workspace_ and _Allow_ on the screen that follows. You'll then be redirected to the App Configuration dashboard.
6. Click on `Manage Distribution` and then make sure all boxes have 
green check marks. Select `Remove Hard Coded Information`, check the box
and then `Activate Public Distribution`.

![activeDistribution](https://user-images.githubusercontent.com/10428517/155411289-45f63a4f-72dc-40b1-a45e-9fae8d2df673.png)


#### Environment Variables

Before you can run the app, you'll need to store some environment variables.

1. Copy `.env.sample` to `.env`
2. Click _Basic Information_ from the left hand menu. There, in the `App Credentials` you should see your `SLACK_CLIENT_ID`, `SLACK_CLIENT_SECRET`, and `SLACK_SIGNING_SECRET`. Click on `Show` and copy and paste those values into your `.env` file.
3. This app uses (the free version of) MongoDB. You'll need to provide your MongoDB username, password, and database name in the `.env` file: `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME`. You can 
feel free to leave the DB_NAME as `slack_connect_test`.

Below, you can see a screenshot of my database configuration. The `DB_NAME` is `slack_connect_test` 
and the collection is named `users`. 

![Screen Shot 2022-02-22 at 11 05 10 AM](https://user-images.githubusercontent.com/10428517/155201340-b6b77e0d-e49b-41c9-a26f-f24c1eb419a2.png)

> Don't forget to save your `.env` and then run 
```source .env``` to set your env variables. 

#### Install Dependencies

`npm install`

#### Run Bolt Server

`npm start`

Great job! You're now ready to install the app using Slack's OAuth process. 

## Step 2. Install the App

Watch the video below **(sound on)** to understand how to install the app. Note that the video is showing the install path from a Ngrok URL. 
The base URL will always we different, based on if you are using Ngrok or Glitch, and depending on what your app is named on Glitch / what forwarding address is used in Ngrok.

[![Install App via OAuth](https://user-images.githubusercontent.com/10428517/154159350-3e5ab314-d9f9-4c38-8d8a-122751d1cc51.png)](https://user-images.githubusercontent.com/10428517/155203611-ffa7b69a-9b6d-40d1-a33e-9ba622c0dfcf.mov)


Next, navigate to your install endpoint. Since we are using Bolt, this endpoint is automatically created for us from the Bolt package. 
1. If you are using Glitch (and assuming your app is hosted at `https://bolt-template-slack-connect.glitch.me`), you can navigate to `https://bolt-template-slack-connect.glitch.me/slack/install`
If you are using Ngrok, it should look something like `https://3cb89939.ngrok.io/slack/install`
2. Click on the `Add to Slack` button.
3. Pick a workspace to install the app to from the top-right corner.
4. Click on the green `Allow` button.
5. You will be redirected to the Redirect URL. Click on "Open Slack". 
6. Once you click on "Open Slack" your browser, you will be taken to the messages tab of your new Slack Connect Admin app! 🎉


## Step 3. Add the App to a Channel

Watch the video below **(sound on)** to understand how to add the app to a channel. First, we 
create a new channel, then we add the app to that channel.

[![Add App to Channel](https://user-images.githubusercontent.com/10428517/155204764-789193f2-8cce-46aa-8268-508cf38195b9.png)](https://user-images.githubusercontent.com/10428517/155204315-2fa1b888-d479-494d-ae80-ebe59da02868.mov)

## Step 4. Send a Slack Connect Invite using the App

Watch the video below **(sound on)** to understand how to send an invite to a user outside of your current organization.

[![sendInvite](https://user-images.githubusercontent.com/10428517/155223135-f9f6a0fd-4e93-4494-bb73-feddbbb09170.png)](https://user-images.githubusercontent.com/10428517/155223009-e03aa7c6-ba0c-46e6-9803-db90906e0138.mov)

First, click on the `Send Invites` button.

Then, in the modal which pops up, choose the channel which you've just added the Slack Connect Admin App to.

In the email section, choose the email which coressponds to the workspace which you want to start a shared channel with.

Leave the rest of the sections blank and click on `Invite`. Lastly, click on `View Invitations` and you should see your 
newly created inviation.


## Step 5. Accept the Slack Connect Invite
Watch the video below **(sound on)** to understand how to accept the invite.

[![acceptInvite](https://user-images.githubusercontent.com/10428517/155223135-f9f6a0fd-4e93-4494-bb73-feddbbb09170.png)](https://user-images.githubusercontent.com/10428517/155225771-184cca6d-f715-45ca-9ba6-452c3a86216b.mov)

Click on the Invite ID at the top of the invitation to be taken to the invite. Select the email account 
associated with the workspace you want to accept the invite from. For me that is the account with `horeaporutiu1@gmail.com`.
Click through the following two pages. You can leave the defaults as is (Public channel, same channel name). Lastly,
click on `Join Channel`. Now, if you click on `View Invitations again` you should see that the buttons have changed. Instead of seeing `Accept` and `Ignore`you will
now see `Approve` and `Deny`. 

## Step 6. Approve the Slack Connect Invite
Watch the video below **(sound on)** to understand how to approve the invite.

[![approveInvite](https://user-images.githubusercontent.com/10428517/155223135-f9f6a0fd-4e93-4494-bb73-feddbbb09170.png)](https://user-images.githubusercontent.com/10428517/155228571-f4a10314-f5bb-4af2-803e-3bcfd41145a9.mov)

Click on the green `Approve` button next to the invite. After a few seconds, you should see that invite dissapear and then the `demo_sc_app` channel will be added under the `Connections` tab, which means it's been shared outside of your own organization! 

## Step 7. Disconnect the Channel

Watch the video below **(sound on)** to understand how to disconnect your shared channel. This will involve installing the app again, but this 
time at the org level. 🚨You need to be **logged in as an org owner / admin** to be able to use this feature.🚨

[![disconnect](https://user-images.githubusercontent.com/10428517/155223135-f9f6a0fd-4e93-4494-bb73-feddbbb09170.png)](https://user-images.githubusercontent.com/10428517/155230983-046ff198-6017-410a-97d1-5ba311496b77.mp4)

To disconnect a channel, we will need a special, [admin scope](https://api.slack.com/scopes/admin.conversations:write). The main difference between
this scope and the other scopes we've requested in the past is that this endpoint reaches across 
an entire Enterprise Grid organization, not individual workspaces. This means it has a lot more 
power than the traditional scopes. 

Once you are ready to install, navigate to the following endpoint: `www.example.com/slack/install/orgadmin`. Since I am using ngrok currently, my endpoint is: https://3015-98-51-61-120.ngrok.io/slack/install/orgadmin. Your base path will look different than mine.

Once you navigate to that endpoint, you should see a purple Add to Slack button. Once you click on that, you should be able to install the app **at the org level**. This means that it is normal to 
see organizations in the drop down, in addition to workspaces. This install will ONLY work on a valid 
organization which you are a Owner or admin of. Watch the video below to see the process in action.

After you've sucessfully installed the app at the org level, click on the 
`Disconnect Channels` button. Select the channel `demo_sc_app` and then 
click on `Disconnect`. 
Within a few seconds, you should see that channel move from the `Connections` section of the sidebar, to the `Channels` section. This means 
that this channel has now been disconnected from the organization it was previously connected to.

## 🎊 Conclusion 🎊 

Great job! You've learned how the Slack Connect APIs work! You've learned how to send an invite, accept and invite, approve an invite, and 
also disconnect a shared channel!

Another thing you may want to try is to edit settings for your organization's Slack Connect use case. If you want to auto approve all 
channels between a certain organization you may do that. This will speed up the creation of Slack Connect channels. 

Thanks so much for learning with me. Please file any issues in this GitHub repo! 
