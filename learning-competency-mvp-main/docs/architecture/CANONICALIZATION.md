# Canonicalization and Record Hash — v1

## Purpose

The M2 → M3 handoff uses a deterministic JSON representation before SHA-256 hashing.

Current implementation:

`record_hash = SHA-256(canonicalJSON(reviewed_state_without_record_hash))`

## canonicalJSON v1

The current JavaScript implementation defines these rules:

1. Objects are serialized with keys sorted lexicographically using JavaScript `Array.prototype.sort()`.
2. Object properties whose value is `undefined` are omitted.
3. Arrays preserve their original order.
4. Array elements are serialized recursively.
5. Strings and object keys use `JSON.stringify`.
6. Numbers, booleans and `null` use `JSON.stringify`.
7. No whitespace is inserted.
8. The resulting UTF-8 string is hashed with SHA-256.

This is a deterministic project-local serialization contract, not a claim of compatibility with RFC 8785 or another external canonical JSON standard.

## Compatibility boundary

Independent verifiers in other languages must reproduce these rules exactly before recalculating `record_hash`.

A future cross-language implementation should either:
- formally specify and test this project-local format; or
- migrate to a recognized canonical JSON standard and version the handoff/hash contract.

Changing canonicalization changes the resulting record hash and therefore requires a versioned contract migration.

## Privacy note

`subject_ref = SHA-256(subject + "|" + record_hash)` is pseudonymization, not strong anonymization. The MVP avoids publishing the subject in clear text, but production deployments should evaluate a secret HMAC/salt if subject-linkability is a concern.
