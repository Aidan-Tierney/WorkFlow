# Build Log — WorkFlow
Example: 
## 2026-04-02

**Built:** Search bar that filters recipes by ingredient.

**Broke:** Filtering ran on every keystroke and froze the page once the list
got long. Fixed it by waiting until typing stops before filtering.

**Decided:** Filtering happens in the browser, not the database. Under 200
recipes it's fast enough and it's a lot less code. Will have to change if
this ever gets big.

**Learned:** What "debounce" means. Also that the obvious way to build search
is usually the slow way.


## 2026-09-19

**Built:** Chose stack and set up scaffold for code (Next.js 16.3.5, React 19, TypeScript, Tailwind 4, App Router, Turbopack). Also pushed to GitHub and deployed on Vercel. Auto-deploys on every push.

**Broke:** npx wouldn't run becasue PowerShell execution policy defaults to Restricted so I fixed it by running Set-ExecutionPolicy -Scope CurrentUser RemoteSigned. I also created two git repos so I deleated one of them and moved on.

**Decided:** Chose TypeScript, Next.js, Supabase, Tailwind, Vercel as my stack. My v1 approach is to take tasks in, check them off, categorize them. 

**Learned:** I learned to create a table before touching any code. With this I learned more on variables and where they should go in my app. I also learned how to import free open source code from the internet to build with (the stack).

## 2026-09-21 (session 1)

**Build:** Supabase Password: xPzwF$X4d6$hWKQ Worked with SQL editor and got my tables set up in supabase and hooked up supabase to visual coding studio. 

**Broke:** Ran into a lot of issues figuring out how to set up my table in the sql editor.

**Decided:** Continue to work on installing tables and now get visual data to show

**Learned:** I learned to use the supabase SQL editor and how to set up my tables using it.

## 2026-09-21 (session 2)

**Build:** I created a checkbox that can handle when a page is refreshed 

**Broke:** Case sensitive rename broke the editor

**Decided:** To make the checklist look nicer

**Learned:** That Visual studio code and my server can disagree. Visual studio code says it's wrong but nothign was wrong

## 2026-09-22 & 23

**Build:** Created a sidebar and add task button and started tailwind. Started to create signup page and storing new users using supabase. 

**Broke:** Vercel didn't have my env variables so it wasn't updating on the url. Checkboxes were broken so I fixed with force-dynamic.

**Decided:** Continue working on sign up

**Learned** I have to give my environmental variables to multiple places or things break. How to set up supabase login. 

## 2026-10-8

**Build:** Made a signin page

**Broke:** There was a typescript error: "Email" does not exist... I cannot signin using my own email

**Decided:** Continue working on signin and signup

**Learned:** Passwords are not reading

## 2026-10-11

**Build:** Debugged my signin/signup page

**Broke:** Network tab in console showed invalid_credentials

**Decided:** Next to add links

**Learned:** How to use console (f12) to debug. Added console.log(JSON.stringify(...)) to print out the info I needed to debug. Then figured out the problem which was most likely autopassword saves for my gmail account. 

## 2026-10-12

**Build:** Added a drop down menu with email and logout button

**Broke:** The button did not work because the order of the function was wrong so the button couldn't be pushed. 

**Decided:** To fix the current checkboxes

**Learned:** More styling code to make a drop down and about typescrpt syntax through trial and error. Found out the function calls do not need {} like in C++ or Java

## 2026-10-13 & 14

**Build:** Login indicator: A circle with the first letter of the email. Usermenu dropdown plus a signout button. Redirect to sign in if not logged in. Checkbox is now optimistic. Error check for adding a task

**Broke:** Two export defaults in one file and a misplaced } that made the circle account vanish. Optimistic save was opposite of what is was supposed to be. "Permission denied for table tasks"

**Decided:** Add projects button. Add remove task button.

**Learned:** More syntax such as ? optional chaining and type narrowing with &&. Defualt vs. named exports. Server vs. client components and Supabase returns errors so silent failures can happen. What optimist updates are and the reload test.

## 2026-10-15 & 16

**Build:** Dashboard and Projects Link in the task bar. Projects tabled completed. RLS, policy, and GRANT for projects and can add new projects.

**Broke:** I pointed to a page that doesn't exist. I put the wrong code in the wrong files when switching code around.

**Decided:** That deleting a project deletes its tasks. Need to make a remove tasks button still

**Learned:** Links go places but buttons do things. .map() needs a unique key. How to use the Timeline to get old code back incase something was deleted. 

## Building Workflow Convo 10/19
1. What does a line between two tasks mean: "must happen before" or "is part of"?

A line could mean both. I was thinking more of is part of or needed befroe but can still check off past the cahin to check all before it.

2. Which way does work flow? Is the project the finish line, or the start?

It starts at the right with the project being the finish line. Actally with how the app is coded now I want each project to be a catagory and then main task with be the finish line. Fro example I can click project and it will have all of the tasks and sub tasks in it.

3. Can a task connect to two tasks (a tree vs. a web)?

Yes in my diagram i have an example.

4. What's the "placeholder" box?

The placeholder box was a continueation of the tasks above. I want the pattern to not just be a straigth line start up middle down middle up repeat.

5. What's the box in the middle labeled "? or box"?

Task probalby im not sure what you ask.

6. What do the arrows mean?

I just drew it so it was easier to read but that could be an idea if tasks fill up the screen too much.

7. How do you create a connection?

Maybe a button at the end of the box that makes a connect i feel like tha twould be easy for now.

8. Are boxes placed automatically, or dragged?

Maybe drag them later but right now lets do automatic.

9. What happens when you check off a task?

When you check off it goes to completed and dissapears. It would be cool to make the line burn like a ticking bomb but that can be later.

10. One project per screen, or all projects on one screen?

One project per screen with how many tasks/subtasks there is.

11. How do Canvas assignments fit in?

Each project of canvas will be a catagory.

Why a workflow instead of a list?

workflow will allow me to stay on task and more organized

Follow-up: tree or web?

I agree on tree first.

Follow-up: what happens to subtasks when a task is deleted?

delete subtaks too

## Design Choices Convo

Mostly gray. About 90% of the screen is white, off-white, or gray.

One accent color. It shows up only on the thing you should click or notice: the “Add task” button, the active nav item, a checkbox ring.

Lots of space. Rows are 32–44px tall, with 8–16px between elements. Nothing touches.

Hierarchy comes from text, not color. They use font weight (400 vs 500/600) and gray shades (dark text vs. muted text), not extra colors.

Meaningful colors are reserved. Red means overdue or priority 1, and it isn’t used as decoration.
