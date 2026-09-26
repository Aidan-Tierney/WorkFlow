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

**Build:** Created a sidebar and add task button and started tailwind. Started to create login page and storing new users using supabase. 

**Broke:** Vercel didn't have my env variables so it wasn't updating on the url. Checkboxes were broken so I fixed with force-dynamic.

**Decided:** Continue working on sign up

**Learned** I have to give my environmental variables to multiple places or things break. How to set up supabase login. 
