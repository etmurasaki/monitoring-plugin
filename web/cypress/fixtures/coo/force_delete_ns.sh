#!/bin/bash

# Script to force-delete a Kubernetes Namespace stuck in a 'Terminating' state
# by automatically clearing its finalizers using sed and tr (instead of jq).

NAMESPACE=$1

# --- Input Validation ---
if [ -z "$NAMESPACE" ]; then
  echo "Error: Please provide the namespace name as the first argument."
  echo "Usage: ./force-delete-ns.sh <namespace-name>"
  exit 1
fi

# Check if the namespace exists
if ! kubectl get namespace "$NAMESPACE" &> /dev/null; then
  echo "Error: Namespace '$NAMESPACE' not found."
  exit 1
fi

echo "Attempting to force-delete namespace '$NAMESPACE' by removing finalizers..."

# 1. Retrieve the namespace JSON.
# 2. Use 'tr' to remove all newlines, creating a single-line JSON string.
# 3. Use 'sed' to perform a substitution:
#    - It finds the pattern "finalizers": [ <anything that is not a closing bracket> ]
#    - It replaces the entire pattern with "finalizers": [] (an empty array).
# 4. Pipe the modified JSON directly to the Kubernetes /finalize endpoint.
kubectl get namespace "$NAMESPACE" -o json | \
  tr -d '\n' | \
  sed 's/"finalizers": \[[^]]*\]/"finalizers": []/' | \
  kubectl replace --raw "/api/v1/namespaces/$NAMESPACE/finalize" -f -

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo ""
    echo "✅ Success: Finalizers for namespace '$NAMESPACE' have been cleared."
    echo "The Namespace should now be fully deleted. Confirm with: kubectl get ns"
else
    echo ""
    echo "❌ Error: The command failed with exit code $EXIT_CODE."
    echo "Please check your kubectl connection and the namespace name."
fi