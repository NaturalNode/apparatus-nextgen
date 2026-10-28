/*
Copyright (c) 2026, Hugo W.L. ter Doest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
KMeans - Original Apparatus API wrapper

Extends KMeansModernized to provide backward-compatible API:
  new KMeans(observations)
  kmeans.cluster(k)
  kmeans.createCentroids(k)
  kmeans.distanceFrom(centroids)
*/

import { VectorLike } from './vector-like'
import { KMeansModernized } from './kmeans-modernized'

/**
 * KMeans - Original Apparatus API
 *
 * Supports the old Apparatus API:
 *   new KMeans(observations)
 *   kmeans.cluster(k)
 *   kmeans.createCentroids(k)
 *   kmeans.distanceFrom(centroids)
 */
export class KMeans extends KMeansModernized {
  Observations: number[][]

  /**
   * Initialize with observations (old Apparatus API)
   * @param observations - Data points
   */
  constructor (observations: number[][])

  /**
   * Cluster the observations into k clusters (old Apparatus API)
   * @param k - Number of clusters
   * @returns Cluster assignments for each observation (Sylvester-compatible vector)
   */
  cluster (k: number): VectorLike

  /**
   * Create initial centroids (old Apparatus API)
   * @param k - Number of clusters
   * @returns Initial centroid positions
   */
  createCentroids (k: number): number[][]

  /**
   * Calculate distances from observations to centroids (old Apparatus API)
   * @param centroids - Centroid positions
   * @returns Distance matrix
   */
  distanceFrom (centroids: number[][]): number[][]
}