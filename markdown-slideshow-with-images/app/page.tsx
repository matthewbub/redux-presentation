"use client";

import { Slideshow } from "@/components/slideshow";

const presentationContent = `
# Redux!

---

# Use of AI Disclaimer:
- The images are AI generated
- If a blurb of text was AI generated, it has been clearly disclosed as such

---

# Outline:

### Pre Redux:

- Comparing Backend data vs UI State
- What is Redux?
- Prop Drilling vs React Context
  - Prop Drilling
  - React Context
- State Machines
- Immutability
  - Shallow equality checking Vs Deep equality checking
- Pure functions
- Arity & Currying

### Redux:

- What is Redux? (Refresher)
- What is RTK?
- Redux Side Effects
  - Thunks
  - Middleware

---

# Comparing Backend data vs UI State

## Backend data

- Source of truth from your API/database
- Persistent and shared across users/sessions
- Lives outside your application

## UI State

- Temporary data for the current users session
- Controls what the user sees and how they interact
- Lost on page refresh

---

# What is Redux?

Redux solves the problem of unpredictable state management in complex JS applications, where dealing with mutations and asynchronicity makes it difficult to understand when, why, and how state changes occur.

Redux makes state mutations predictable by imposing restrictions on how and when updates can happen

_Source:_ https://redux.js.org/understanding/thinking-in-redux/motivation

_Quick Review:_ Redux 3 principles: https://redux.js.org/understanding/thinking-in-redux/three-principles

---

# Prop Drilling vs React Context

![Prop Drilling vs Context](https://3zmdnu3csfagxyyo.public.blob.vercel-storage.com/PropDrillingVsReact_Gemini_Generated_Image_j2wqclj2wqclj2wq.png)

---

# Prop Drilling

Prop drilling has a Vertical data flow (step-by-step)


\`\`\`jsx
function App() {
  const [user] = useState({ name: "Alice" });
  return <Layout user={user} />;
}

function Layout({ user }) {
  return <Header user={user} />; // must pass through
}

function Header({ user }) {
  return <h1>Hello, {user.name}</h1>;
}
\`\`\`

\`Layout\` must accept and forward \`user\` even though it doesn't use it — it's just a middleman


---

# Prop Drilling: Pros & Cons

## Pros

- Explicit data flow
- Fine for small apps
- easy to debug when working in small apps

## Cons

- Code becomes cluttered - intermediate components become "pass-through" components
- Tightly coupled together
- Triggers unnecessary re-renders (<- This is the problem your users will experience)

---

# React Context

React Context has a **Broadcast data flow** (direct access)

\`\`\`jsx
const UserContext = createContext();

function App() {
  const [user] = useState({ name: "Alice" });
  return (
    <UserContext.Provider value={user}>
      <Layout />
    </UserContext.Provider>
  );
}

function Layout() {
  return <Header />; // no props needed!
}

function Header() {
  const user = useContext(UserContext);
  return <h1>Hello, {user.name}</h1>;
}
\`\`\`

\`Layout\` doesn't need to know about \`user\` at all — \`Header\` grabs it directly from context

---

# React Context: Pros

- Avoids prop drilling
- Built-in to React
- ideal for static data that doesn't change often (locales, theme e.g dark/light mode)
- provides a single source of truth

Cons

- Performance concerns. When a value in \`Provider\` changes, all components that consume the context must re-render (even if using a part of the context that didn't change)
- Challenging to debug (No built-in timeline mechanism like Redux)
- Not suitable for complex logic - no built in patterns for things like async dataflows, middleware or structured updates

---

# State Machines

> A finite-state machine AKA state machine is a mathematical model of computation. It is an abstract machine that can be exactly one of a finite number of states at any given time.


<Walk Through Redux Dev Tools Example>

- At any moment, the system is in exactly one state (from a defined set)
- Something happens (an event / input / button click)
- The system follows a rule (called transitions) to move to the next state
- Optionally, the transition triggers effects (do work) or guards (only allow transition if a condition is true)

---

# State Machine Examples:

Can anyone list an example of a state machine?

---

# State Machine Examples:

- Vending machines dispense products when the proper combination of coins is deposited
- Elevators: whose sequence of stops is determined by the floors requested by riders;
- Traffic Lights: which change sequence when cars are waiting
- Combination locks: which require the input of a sequence of numbers in the proper order.

Source: https://en.wikipedia.org/wiki/Finite-state_machine

![State_Machines](https://3zmdnu3csfagxyyo.public.blob.vercel-storage.com/State_Machines_Gemini_Generated_Image_lc0h0lc0h0lc0h0l.png)

---

# Immutability

![Immutable definition](https://3zmdnu3csfagxyyo.public.blob.vercel-storage.com/Screenshot%202026-01-14%20at%202.16.33%E2%80%AFPM.png)

Redux uses immutability to:

<Showcase the immutable object>

- enable shallow equality checking.
- enable time-travel debugging (jumping between different states)
- "make data handling safer"

_Sources:_

- https://redux.js.org/faq/immutable-data#why-is-immutability-required-by-redux
- https://redux.js.org/faq/immutable-data#what-are-the-benefits-of-immutability

---

# Shallow vs Deep Equality Checking

![Shallow vs Deep Equality](https://3zmdnu3csfagxyyo.public.blob.vercel-storage.com/nascar-race-shallow-vs-deep-equality--t3chat--1%20%281%29.png)

- Shallow equality checking simply checks that two different variables reference the same object
- Deep equality checking must check every value of two objects' properties.

A shallow equality check is therefore as simple (and as fast) as \`a === b\`

Source: https://redux.js.org/faq/immutable-data#why-is-immutability-required-by-redux


---

# Pure Functions

**Trivia Q:** Can anyone name the 2 specific criteria?

Pure functions must meet two specific criteria:

---

# Pure Functions

**Trivia Q:** Can anyone name the 2 specific criteria?

Pure functions must meet two specific criteria:


1. **Given the same inputs, it always returns the same output**
2. **It produces no side effects**

---

# Arity & Currying

**Arity** refers to the number of arguments a function takes.

## Why is Arity important in Redux?
- Reducers adhere to a fixed arity: \`(state, action) => newState\`
- Action creators have arity based on data they need

> Trivia Q: Arity in mathematics is also known as:

---

# Arity & Currying

**Arity** refers to the number of arguments a function takes.

## Why is Arity important in Redux?
- Reducers adhere to a fixed arity: \`(state, action) => newState\`
- Action creators have arity based on data they need

> Trivia Q: Arity in mathematics is also known as: **rank**

---


# Action Creator Arity Examples

\`\`\`ts
import { createAction } from "@reduxjs/toolkit";

// Arity 0: No parameters needed
const increment = createAction("counter/increment");
// increment() → { type: "counter/increment" }

// Arity 1: Requires 'amount' to determine how much to increment
const incrementByAmount = createAction<number>("counter/incrementByAmount");
// incrementByAmount(5) → { type: "counter/incrementByAmount", payload: 5 }

// Arity 1: Requires 'id' to know which post to delete
const deletePost = createAction<string>("posts/delete");
// deletePost("abc123") → { type: "posts/delete", payload: "abc123" }

// Arity 2: Needs both a username and a session ID
const setUsername = createAction(
  "user/setUsername",
  (username: string, sessionId: string) => ({
    payload: { username, sessionId },
  })
);
// setUsername("alice", "sess_123") → { type: "user/setUsername", payload: { username: "alice", sessionId: "sess_123" } }

// Arity 1: (Destructured from 1 object argument)
const updatePost = createAction<{ id: string; title: string; content: string }>(
  "posts/postUpdated"
);
// updatePost({ id: "1", title: "Hello", content: "World" }) → { type: "posts/postUpdated", payload: { id: "1", title: "Hello", content: "World" } }
\`\`\`

---

# On Redux

---

# Recall: What is Redux? (Refresher)

Redux solves the problem of unpredictable state management in complex JS applications, where dealing with mutations and asynchronicity makes it difficult to understand when, why, and how state changes occur.

Redux makes state mutations predictable by imposing restrictions on how and when updates can happen

_Source:_ https://redux.js.org/understanding/thinking-in-redux/motivation

---

# What is RTK (Redux Toolkit)?

It was created Redux Toolkit to eliminate the "boilerplate" from hand-written Redux logic, prevent common mistakes, and provide APIs that simplify standard Redux tasks.

Source: https://redux-toolkit.js.org/introduction/why-rtk-is-redux-today#what-does-redux-toolkit-do

---

# State (Redux store)

With Redux, we're taking an approach much more in-line with React Context in the sense that we're shifting from decentralized, component-owned state to a Single Source of Truth

<!-- Mat
- Show \`combineSlices(counterSlice, quotesApiSlice)\` in \`redux/redux-with-rtk-example/src/app/store.ts\`
- Show the final product in DevTools -->

Discussion: Not all state needs to live in a global store. What state is better kept at a local component level?

---

# When to Use Redux vs Local State

"AI Generated" rule of thumb for when to use Redux vs local state:

> Ask yourself:
>
> 1. Does another component need this state? → Redux (or lift state up)
> 2. Does it need to survive navigation? → Redux
> 3. Is it purely visual/temporary? → Local state
> 4. Would prop drilling be 3+ levels? → Redux (or Context)

---

# Dispatching actions

> The only way to update the state is to call store.dispatch() and pass in an action object. You can think of dispatching actions as "triggering an event

\`\`\`tsx
const updatePost = createAction<{ id: string; title: string; content: string }>(
  "posts/postUpdated"
);
dispatch(updatePost({ id: "1", title: "Hello", content: "World" }));
// → { type: "posts/postUpdated", payload: { id: "1", title: "Hello", content: "World" } }

console.log(store.getState());
// Output:
// {
//   counter: { value: 10 },
//   posts: [{ id: "1", title: "Redux" }]
// }
\`\`\`



Show real code example in \`redux/redux-with-rtk-example/src/features/counter/Counter.tsx\`

Source: https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#dispatch

---


# Reducers

Reducers must always follow some specific rules:

- They should only calculate the new state value based on the state and action arguments
- They are not allowed to modify the existing state. Instead, they must make immutable updates, by copying the existing state and making changes to the copied values.
- They must not do any asynchronous logic, calculate random values, or cause other "side effects"

See: \`redux-with-rtk-example/src/features/counter/counterSlice.ts\` - \`increment\`, \`decrement\`, \`incrementByAmount\`


---

# Redux Side Effects

- Thunks
- Middleware

---

# Thunks

A thunk is a specific kind of Redux function that can contain asynchronous logic.

> For Redux specifically, "thunks" are a pattern of writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.

See: \`redux-with-rtk-example/src/features/counter/counterSlice.ts\` - \`incrementAsync\`

Sources: 
- https://redux.js.org/usage/writing-logic-thunks
- https://redux.js.org/tutorials/essentials/part-2-app-structure

---


# Middleware


> It provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. People use Redux middleware for logging, crash reporting, talking to an asynchronous API, routing, and more.

See: \`redux-with-rtk-example/src/app/store.ts\` - RTK Query middleware configuration

Sources: https://redux.js.org/understanding/history-and-design/middleware


---

Thats all folks!

![](https://3zmdnu3csfagxyyo.public.blob.vercel-storage.com/Redux-Badge-Gemini_Generated_Image_7iokd57iokd57iok.png)

`;

export default function Home() {
  return <Slideshow content={presentationContent} />;
}
