# Security Policy

## Supported Versions

As this project is currently in a pre-release state (version 0.0.x), we only provide security updates for the latest version.

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |
| < 0.0   | :x:                |

## Reporting a Vulnerability

We take the security of this project seriously, especially regarding the client-side encryption and data privacy features. If you discover a security vulnerability, we appreciate your help in disclosing it to us in a responsible manner.

### How to report
**Please do not report security vulnerabilities via public GitHub issues.** Instead, please send a detailed report to:
**security@myslennya.com** 

In your report, please include:
* **Vulnerability Type**: (e.g., XSS, Rule bypass, encryption logic flaw).
* **Steps to Reproduce**: A clear, step-by-step description or a Proof of Concept (PoC).
* **Potential Impact**: What data or functionality is at risk?

### What to expect
1.  **Acknowledgment**: You will receive a response confirming we have received your report within **48 hours**.
2.  **Assessment**: Our team will analyze the issue and provide an initial evaluation within **5 business days**.
3.  **Remediation**: If confirmed, we will work on a fix. We will keep you updated on the progress and estimated time for a release.
4.  **Disclosure**: Once the fix is deployed, we may publish a security advisory. We will gladly credit you for the discovery if you wish.

### Our Priorities
We are particularly interested in vulnerabilities related to:
* Circumventing client-side encryption without the correct passphrase.
* Unauthorized access to data through misconfigured security rules.
* Exposure of sensitive credentials due to incorrect environment variable handling.

---

> **Responsible Disclosure Policy:** We ask that you give us a reasonable amount of time to fix the issue before making any information public. By following this process, you help us protect our users and their sensitive data.
