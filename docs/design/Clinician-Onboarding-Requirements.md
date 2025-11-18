---
title: "Clinician Onboarding Web App"
source: "https://claude.ai/chat/d4e3453e-1f73-4bbf-9678-b2541b088797"
author:
published:
created: 2025-11-17
description: "Talk with Claude, an AI assistant from Anthropic"
tags:
  - "Inbox/Clippings"
---
Help me create a web app that onboards clinicians for my digital platform, collective good. We will place advertisements with a link to the web app. Upon clicking the link, clinicians will be directed to a sign up page. The page will use CollectiveGood colors and branding as on the website here: [https://www.collectivegood.io/](https://www.collectivegood.io/)

The page will provide some information on CollectiveGood and an explanation that we are recruiting clinicians for a forthcoming platform for clinicians to contribute to informing a unique approach to responsible clinical AI designed to work with clinicians and complement their expertise. (I can provide add copy with example language after we have the functional prototype working.)

The clinicians will first create an account. Then they will fill in some profile information and answer a short set of questions on their background.

After profile is created and background information collected, clinicians will be asked to complete an approximately 10 minute clinical skill profile assessment. This does not determine their eligibility to participate but is designed to helps us determine what clinical cases best suit their current skill profile.

Once they start the assessment they will be presented with a series of structured clinical vignettes (patient profiles) and asked to provide a differential diagnosis for each. The assessment tool with dynamically adapt cases presented based on the current estimate and uncertainty of the clinicians skill profile (similar to a computer adaptive test). When needed, I can provide more information on the technical parameters of the algorithm driving the assessment and estimation of the clinicians skill profile.

After they complete the assessment, they will be able to see their details on their current skill profile in a dashboard page on the application.

The application needs to be responsive as many clinicians will be using their mobile phones.

---

Here are thoughts on the adaptive testing algorithm. See the section on the cold-start jump-start.

Let’s start with a relatively simple IRT implantation with updating and then add complexity over time

---

Here are thoughts on the adaptive testing algorithm. See the section on the cold-start jump-start.

Let’s start with a relatively simple IRT implantation with updating and then add complexity over time.

Instead of multiple choice questions, instead ask for users to enter a full differential diagnosis including any likely diagnoses and flagging not-to-miss diagnoses. They should be able to indicate their ranking of the diagnoses they list and also their confidence in each.

---

Here are thoughts on the adaptive testing algorithm. See the section on the cold-start jump-start.

Let’s start with a relatively simple IRT implantation with updating and then add complexity over time.

Instead of multiple choice questions, instead ask for users to enter a full differential diagnosis including any likely diagnoses and flagging not-to-miss diagnoses. They should be able to indicate their ranking of the diagnoses they list and also their confidence in each.

---

Create a detailed scoring rubric document.

On the feedback page, show how the user’s answer compares to their close peers on the app who have answered the same question. Also add a close peer comparison to the user’s competence profile dashboard.

Update the PRD document when finished

---