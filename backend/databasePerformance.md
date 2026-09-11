# Database Performance & Query Optimization Report

**Author:** Member 4 (Lochana Ranathunga)  
**Milestone:** Phase 3 — Database Management, Persistence & Performance  
**Branch:** `feature/mongodb-performance-by-Lochana`

---

## 1. Data Modeling Architecture

SyncBoard implements a hybrid document design pattern to balance read latency against update frequency:

* **Embedded Columns (Within Board):** Columns (`To Do`, `Doing`, `Done`) are embedded as subdocuments inside the `Board` model. The column count is strictly bounded (rarely exceeding 5-7 per board) and columns are always retrieved together with the board layout. This guarantees atomic board writes and zero join overhead for core views.
* **Referenced Tasks:** Tasks are stored in a dedicated `tasks` collection referencing `boardId`. Storing tasks inside the board document would introduce the unbounded array anti-pattern, causing document growth past limits and write collisions during concurrent card edits.

---

## 2. Compound Indexing Strategy

To eliminate unindexed collection scans (`COLLSCAN`), two strategic compound indexes were added to the `Task` collection:

### A. Board View Pipeline (`{ boardId: 1, status: 1, position: 1 }`)
* **Purpose:** Serves the primary Kanban interface query (`find({ boardId, status }).sort({ position: 1 })`).
* **Design Rule:** Follows the Equality-Equality-Sort rule. Matching equality on `boardId` and `status` narrows down the subset, while the `position` index order satisfies the sort directly without in-memory sorting.
* **Impact:** Eliminates in-memory sorting overhead (`Is not sorted in memory: true`).

### B. User Workspace Pipeline (`{ assignee: 1, status: 1 }`)
* **Purpose:** Serves member-specific dashboards and filter tabs (e.g., "My Open Tasks").
* **Design Rule:** Matches equality on assignee identity before filtering by status lifecycle.
* **Impact:** Limits query scope to relevant member tasks without scanning unrelated board records.

---

## 3. Query Service & Resource Optimization (`queryService.js`)

A centralized query builder was implemented to reduce database overhead across all controller endpoints:

* **Strict Pagination (`skip`, `limit`):** Prevents large batch queries from overwhelming server memory by enforcing default and maximum retrieval thresholds.
* **Dynamic Projections (`.select()`):** Allows clients to specify exact fields needed (`?fields=title,status,priority`), drastically reducing network payload size and BSON deserialization cost.
* **Safe Filtering & Sorting:** Sanitizes incoming query parameters to prevent query injection while ensuring sort keys leverage existing indexes.

---

## 4. Verification & Explain Plan Analysis

Query performance was verified using MongoDB Compass and execution statistics:

* **Winning Plan Stage:** `IXSCAN` (Index Scan)
* **Index Used:** Compound key lookups
* **Efficiency Metric:** `totalDocsExamined` strictly equals `nReturned` (1:1 ratio), confirming zero redundant document reads.
