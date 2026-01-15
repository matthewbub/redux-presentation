import type { JSX } from "react"
import { useState } from "react"
import styles from "./PropDrillingExample.module.css"

/**
 * BAD EXAMPLE: Prop Drilling Causes Unnecessary Re-renders
 *
 * Watch React Scan highlight ALL components when you click the button!
 * Even components that don't use the count value will re-render.
 */

// Deep child that actually needs the count
const CountDisplay = ({ count }: { count: number }): JSX.Element => {
  return <span className={styles.count}>Count: {count}</span>
}

// This component doesn't use count, but receives it to pass down
// It will STILL re-render when count changes!
const MiddleComponent = ({
  count,
  onIncrement,
}: {
  count: number
  onIncrement: () => void
}): JSX.Element => {
  return (
    <div className={styles.middle}>
      <span className={styles.label}>Middle Component (doesn't use count)</span>
      <InnerComponent count={count} onIncrement={onIncrement} />
    </div>
  )
}

// Another intermediary that doesn't need count
const InnerComponent = ({
  count,
  onIncrement,
}: {
  count: number
  onIncrement: () => void
}): JSX.Element => {
  return (
    <div className={styles.inner}>
      <span className={styles.label}>Inner Component (doesn't use count)</span>
      <DeepComponent count={count} onIncrement={onIncrement} />
    </div>
  )
}

// Finally uses the count
const DeepComponent = ({
  count,
  onIncrement,
}: {
  count: number
  onIncrement: () => void
}): JSX.Element => {
  return (
    <div className={styles.deep}>
      <span className={styles.label}>Deep Component (uses count)</span>
      <CountDisplay count={count} />
      <button className={styles.button} onClick={onIncrement}>
        Increment
      </button>
    </div>
  )
}

// This sibling component doesn't need count AT ALL
// But it will STILL re-render because it's a child of the parent that holds state!
const UnrelatedSibling = (): JSX.Element => {
  return (
    <div className={styles.sibling}>
      <span className={styles.label}>
        Unrelated Sibling (no props, still re-renders!)
      </span>
      <p>I have nothing to do with the counter...</p>
    </div>
  )
}

// Another unrelated component
const AnotherSibling = ({ title }: { title: string }): JSX.Element => {
  return (
    <div className={styles.sibling}>
      <span className={styles.label}>{title}</span>
      <p>I also don't care about the count value</p>
    </div>
  )
}

export const PropDrillingExample = (): JSX.Element => {
  // State lives at the top - ANY change here re-renders ALL children
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount(prev => prev + 1)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Prop Drilling Example</h2>
      <p className={styles.subtitle}>
        Click increment and watch React Scan - ALL components re-render!
      </p>

      <div className={styles.layout}>
        {/* These siblings re-render even though they don't need count */}
        <UnrelatedSibling />
        <AnotherSibling title="Static Sibling" />

        {/* Props drilled through multiple levels */}
        <MiddleComponent count={count} onIncrement={handleIncrement} />
      </div>
    </div>
  )
}
