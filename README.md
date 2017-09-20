# I need service now.

## Epic
Create and application that will can provide users with the services that they need when they need them.  Providers can register their service as well as logon and modify their profile.
Registered providers will be vetted by the site and their Service will now be made available on the site until vetted.  Providers can logon and update their availability status or use Geo location to show themselves as 'green' or available for service.  Users will be able to search registered and vetted service providers having a listing of the service provider in order of their 'green' (available) status and geo location area.  When a user selects a 'green' status provider a SMS message will be sent to the user and the provider prompting both that a service has been requested.  Users will also have the ability to leave comments on service providers as well as rank the providers.  The goal of this site is to provide customers access to needed services 'now'.  An Admin console will also be implemented for the vetting of service providers and comment monitoring.

## User Stories
1. As a user I want to select from a listing of currently available services near my location.
2. As a user of a service I want Text Messaging communication to start right away with myself and the Service provider.
3. As a user I want to receive an SMS message that the provider has been contacted.
4. As a registered/vetted service provider I want to receive a SMS message as when a user is reaching out to me.
5. As a user I want to comment on the service quality provided by the selected provider.
6. As a user I want to be able to rank the service provider.
7. As an Administrator I want to be able to have edit control over the providers registered (so I can set the vetted boolean and delete those that do not pass the vetting process).
8. As an Administrator I want edit control over all comments.
9. As a Service provider I want to be able to register and have edit capabilities over my profile.
10. As a registered provider I want to update my availability status -'green light'.


## Work Items
1. Work Items for User Story 1
   * Service Provider table will require a category column that will be rendered on the user page as a picklist.
   * Additional Provider table columns will be:
      * category:string
      * name:string
      * cell_phone:string
      * available:boolean
      * company:string
      * address:string
      * url:string
      * user_id:integer
2. Work Item for User Story 2
   * NPM https://www.nexmo.com/products/sms
3. Work Item for User Story 3
   * NPM https://www.nexmo.com/products/sms
4. Work Item for User Story 4
   * NPM https://www.nexmo.com/products/sms
5. Work Item for User Story 5
   * Comment table will require following columns
      * comment:string
      * rank:integer
      * provider_id:integer
6. Work Item for User Story 6
   * Ranking will exist in the comment table rank column and be averaged by adding all the rankings for the provider being ranked to a maximum value of 5.
7. Work Item for User Story 7
   *  Admin user will be the only user that can edit the provider table record vetted:boolean.
   * Admin user will be the only user that can delete provider records.
8. Work Item for User Story 8
   *  Admin user will be the only user that can show and delete the comments records.
9. Work Item for User Story 9
   * User table will require the following columns:
      * username:string
      * password:string
      * email:string
    * User will have edit and delete capabilities for their account.
    * Upon User account delete the Provider record will also be deleted with the User account.
    * The Administrator will have full CRUD for the user records.

## Streach Goals
1. Automatically and on a periodic base update the providers status based on cell_phone geolocation.
   * A mobile app allowing location polling of Providers Location.
2. Guarded programming.
   * Close all the errors for bad data entry.
   * Restrict usernames to be unique.
3. 


## GitHub Project Links

## Heroku Deployment Link
