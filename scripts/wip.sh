#!/bin/bash

# Function to show help message
show_help() {
    echo "WIP Management Script"
    echo "Usage:"
    echo "  ./wip.sh save \"message\"    - Save current changes as WIP with a message"
    echo "  ./wip.sh list               - List all WIP stashes"
    echo "  ./wip.sh apply [stash@{n}]  - Apply the latest or specific WIP stash"
    echo "  ./wip.sh branch \"name\"      - Create a new WIP branch with current changes"
    echo "  ./wip.sh commit \"message\"   - Commit WIP changes with relaxed linting"
}

# Function to save WIP
save_wip() {
    if [ -z "$1" ]; then
        echo "Please provide a message for your WIP"
        exit 1
    fi
    git add .
    git stash push -m "WIP: $1"
    echo "WIP saved: $1"
}

# Function to list WIP stashes
list_wip() {
    echo "WIP Stashes:"
    git stash list | grep "WIP:"
}

# Function to apply WIP
apply_wip() {
    if [ -z "$1" ]; then
        git stash pop
    else
        git stash pop "$1"
    fi
}

# Function to create WIP branch
create_wip_branch() {
    if [ -z "$1" ]; then
        echo "Please provide a branch name"
        exit 1
    fi
    current_branch=$(git branch --show-current)
    git checkout -b "wip/$1"
    echo "Created WIP branch: wip/$1 from $current_branch"
}

# Function to commit WIP changes
commit_wip() {
    if [ -z "$1" ]; then
        echo "Please provide a commit message"
        exit 1
    fi
    # Use WIP ESLint config for linting
    ESLINT_CONFIG=.eslintrc.wip.json yarn lint-staged
    git commit -m "WIP: $1"
    echo "WIP changes committed: $1"
}

# Main script logic
case "$1" in
    "save")
        save_wip "$2"
        ;;
    "list")
        list_wip
        ;;
    "apply")
        apply_wip "$2"
        ;;
    "branch")
        create_wip_branch "$2"
        ;;
    "commit")
        commit_wip "$2"
        ;;
    *)
        show_help
        ;;
esac
