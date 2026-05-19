# Security Policy

## Supported Versions

We only provide security updates and patches for the latest stable release of OneVello. Since this is a client-side encrypted service, we enforce updating to the newest version to ensure maximum privacy and security.

| Version            | Supported          |
| ------------------ | ------------------ |
| Latest Release     | :white_check_mark: |
| All Older Versions | :x:                |

## Contribution Security & Branching Policy

To ensure the integrity of the production environment and protect users' data, we enforce a strict branching and merging workflow:

- **Development Target**: All Pull Requests from contributors must be targeted **only towards the `development` branch**. PRs opened directly against `master` or production branches will be automatically rejected or closed.
- **Review & Merge**: Only the repository maintainer (@myk-d) has the permissions to review, approve, and merge Pull Requests into the `development` and `master` branches.
- **Testing**: Any security patches or feature contributions must be thoroughly tested in the `development_messages` environment before being considered for a production release.

## Reporting a Vulnerability

We take the security of this project seriously, especially regarding the client-side encryption and data privacy features. If you discover a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner.

### How to report

**Please do not report security vulnerabilities via public GitHub issues.** Instead, please send a detailed report to:
**security@myslennya.com**

In your report, please include:

- **Vulnerability Type**: (e.g., XSS, Firestore Rule bypass, encryption logic flaw).
- **Steps to Reproduce**: A clear, step-by-step description or a Proof of Concept (PoC).
- **Potential Impact**: What data or functionality is at risk?

### What to expect

1. **Acknowledgment**: You will receive a response confirming we have received your report within **48 hours**.
2. **Assessment**: The core maintainer will analyze the issue and provide an initial evaluation within **5 business days**.
3. **Remediation**: If confirmed, we will work on a fix. We will keep you updated on the progress and estimated time for a release.
4. **Disclosure**: Once the fix is deployed, we may publish a security advisory. We will gladly credit you for the discovery if you wish.

### Our Priorities

We are particularly interested in vulnerabilities related to:

- Circumventing client-side encryption without the correct passphrase.
- Unauthorized access to data through misconfigured Firestore security rules.
- Exposure of sensitive credentials due to incorrect environment variable handling.

---

> **Responsible Disclosure Policy:** We ask that you give us a reasonable amount of time to fix the issue before making any information public. By following this process, you help us protect our users and their sensitive data.
