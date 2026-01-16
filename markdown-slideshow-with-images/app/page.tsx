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

Arity of 1 
Same as 

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

Redux makes working with state **predictable** by imposing restrictions on how and when updates can happen

---

# What is RTK (Redux Toolkit)?

There's a-lot of boilerplate in Redux. RTK is a library that helps you write less of the boilerplate and avoid common mistakes.

---

# Dispatching actions

AKA "Triggering an event" - this is how you update the state.

Updating Redux State requires dispatching an action object.

\`\`\`tsx
<button onClick={() => dispatch(increment())}>
  Increment
</button>
\`\`\`


---

# Reducers

Reducers must always follow some specific rules:

- They must be pure functions that return a new state value based on the state and action arguments
- Reducers must make immutable updates by creating copies of state rather than modifying the original.
- They must not do any asynchronous logic, calculate random values, or cause other "side effects"

---

# Reducers

RTK Reducer Example:

\`\`\`ts
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    // ... other reducers ...
  },
});


// ...

const MyButton = () => {
  // ...
  return (
    <button onClick={() => dispatch(increment())}>
      Increment
    </button>
  )
}
\`\`\`

---

# Redux and Side Effects

- Redux reducers must never contain "side effects", and can only contain synchronous logic.
- A "side effect" is a change to state or behavior that can be seen outside of a returning value from a function.

---

# Redux Middleware 

Redux middleware enables you to write logic that _does have side effects_ and _can contain_ asynchronous logic.

- It has access to the same dispatch and getState functions as the reducers.

---

# Thunks

"Thunks" are one of the patterns most commonly used to write asynchronous logic in Redux. 

Redux defines a "thunk" as a piece of code that does some delayed work.

---

Thats all folks!

`;

export default function Home() {
  return <Slideshow content={presentationContent} />;
}
