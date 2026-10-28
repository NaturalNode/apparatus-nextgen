/*
K-Means Performance Benchmark
Modernized implementation
*/

const KMeansModernized = require('../lib/apparatus/clusterer/kmeans-modernized')

// Generate random dataset
function generateDataset (numPoints, dimensions) {
  const data = []
  for (let i = 0; i < numPoints; i++) {
    const point = []
    for (let j = 0; j < dimensions; j++) {
      point.push(Math.random() * 100)
    }
    data.push(point)
  }
  return data
}

// Generate clustered dataset (more realistic)
function generateClusteredDataset (numClusters, pointsPerCluster, dimensions) {
  const data = []

  for (let c = 0; c < numClusters; c++) {
    // Random cluster center
    const center = []
    for (let d = 0; d < dimensions; d++) {
      center.push(Math.random() * 100)
    }

    // Generate points around center
    for (let p = 0; p < pointsPerCluster; p++) {
      const point = []
      for (let d = 0; d < dimensions; d++) {
        point.push(center[d] + (Math.random() - 0.5) * 10)
      }
      data.push(point)
    }
  }

  return data
}

// Benchmark function
function benchmark (name, fn, iterations = 1) {
  const start = process.hrtime.bigint()
  const startMem = process.memoryUsage().heapUsed

  let result
  for (let i = 0; i < iterations; i++) {
    result = fn()
  }

  const end = process.hrtime.bigint()
  const endMem = process.memoryUsage().heapUsed

  const durationMs = Number(end - start) / 1000000 / iterations
  const memoryDelta = (endMem - startMem) / 1024 / 1024

  return {
    name,
    duration: durationMs,
    memory: memoryDelta,
    result
  }
}

// Run benchmark suite
function runBenchmark (datasetName, data, k, iterations = 5) {
  console.log(`\n${'='.repeat(60)}`)
  console.log(`Benchmark: ${datasetName}`)
  console.log(`Dataset: ${data.length} points, ${data[0].length} dimensions, k=${k}`)
  console.log(`Iterations: ${iterations}`)
  console.log('='.repeat(60))

  const kmeansModern = new KMeansModernized(k)
  kmeansModern.fit(data)

  // Benchmark Modernized
  const modernizedResult = benchmark('KMeans Modernized', () => {
    const kmeans = new KMeansModernized(k, { maxIterations: 100 })
    kmeans.fit(data)
    return kmeans.getAssignments()
  }, iterations)

  // Results
  console.log('\nResults:')
  console.log('-'.repeat(60))

  console.log(`Modernized:  ${modernizedResult.duration.toFixed(2)} ms, Memory: ${modernizedResult.memory.toFixed(2)} MB`)

  return { modernized: modernizedResult }
}

// Main benchmark suite
console.log('\n' + '='.repeat(60))
console.log('K-MEANS PERFORMANCE BENCHMARK')
console.log('='.repeat(60))

const results = []

// Test 1: Random dataset (worst case - no natural clusters)
const random = generateDataset(100, 2)
results.push(runBenchmark('Random Dataset (100 points, 2D)', random, 5, 5))

// Test 2: Small dataset
const small = generateClusteredDataset(3, 10, 2)
results.push(runBenchmark('Small Clustered Dataset (30 points, 2D)', small, 3, 10))

// Test 3: Medium dataset
const medium = generateClusteredDataset(5, 50, 2)
results.push(runBenchmark('Medium Clustered Dataset (250 points, 2D)', medium, 5, 5))

// Test 4: Large dataset
const large = generateClusteredDataset(10, 100, 2)
results.push(runBenchmark('Large Clustered Dataset (1000 points, 2D)', large, 10, 3))

// Test 5: High dimensional
const highDim = generateClusteredDataset(5, 50, 10)
results.push(runBenchmark('High Dimensional Clustered (250 points, 10D)', highDim, 5, 5))

// Test 6: Very large dataset
const veryLarge = generateClusteredDataset(10, 500, 2)
results.push(runBenchmark('Very Large Clustered Dataset (5000 points, 2D)', veryLarge, 10, 1))

// Summary
console.log('\n' + '='.repeat(60))
console.log('SUMMARY')
console.log('='.repeat(60))

let totalDuration = 0
let totalMemory = 0
let count = 0

results.forEach((r, i) => {
  if (r.modernized.duration > 0) {
    totalDuration += r.modernized.duration
    totalMemory += Math.abs(r.modernized.memory)
    count++
  }
})

if (count > 0) {
  const avgDuration = (totalDuration / count).toFixed(2)
  const avgMemory = (totalMemory / count).toFixed(2)

  console.log('\nPerformance:')
  console.log(`  Benchmarks completed: ${count}`)
  console.log(`  Average duration: ${avgDuration} ms`)

  console.log('\nMemory Usage (average absolute delta):')
  console.log(`  Modernized:  ${avgMemory} MB`)
} else {
  console.log('\nModernized implementation:')
  results.forEach((r, i) => {
    console.log(`  Test ${i + 1}: ${r.modernized.duration.toFixed(2)} ms (${r.modernized.memory.toFixed(2)} MB)`)
  })
}

console.log('\n' + '='.repeat(60))
