# Game of Thrones For Dummies (or Cliffnotes. Still unsure which is more appropriate branding)

## What is Game of Thrones for Dummies?

Game of Thrones is the most popular show on television beloved by millions
around the world. There is a group of fans like myself who obsessively keep
track of every character, house, and event that happens throughout the show
and beyond, but there are many more casual viewers who tune in for the spectacle
but struggle to remember the names of the countless characters that have 
appeared on the show through its near 7-season run. 

My app will allow these casual viewers and those who have not seen the show who are ready to dip their toes in to do so at their own pace. If there's a character, house, event, allegiance, or
item from the World of Ice and Fire that you're unclear on or just want to learn
more about, all you'll have to do is just type in the name and whatever other
information you want, and with the help of the API of Ice and Fire, you'll
get the requisite info you seek and you'll be able to keep a running list 
of things you want to learn more about. If there's something else you want to 
know about a character, you'll be able to update that entry with a new trait.
When you feel that your knowledge is sufficient, you can delete that entry as well.

The app will also have user authentication, so that each user's list will be password
protected and they can keep their knowledge (or lack thereof) private.

## Wireframes

### Main page to login and register
![index](./project2wireframes/IMG_0807.JPG)

### Register and Login Screens
![register](./project2wireframes/IMG_0808.JPG)

### GoT Index Screen: List of things in your list
![got-index](./project2wireframes/IMG_0809.JPG)

### Screen for each entry and Screen for updating info
![got-single](./project2wireframes/IMG_0810.JPG)

### Add a character, house to your list
![got-add](./project2wireframes/IMG_0811.JPG)

## Database structure
CREATE TABLE users
VALUES
(id, username, email, password_digest)

ALTER TABLE GoT
ADD COLUMN user_id INTEGER REFERENCES users(id);

CREATE TABLE GoT
VALUES
(character_name, house, actor_name)

### Want ability to alter the GoT table based on which information the user wants   
