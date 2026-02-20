import { generateText, tool } from "ai";
import { z } from "zod";
import { model } from "./_internal/setup";
import { createSession } from "./session";

export async function main(params = {
  firstName: "John",
  lastName: "Doe",
  dateOfBirth: "1990-01-01",
  medicalId: "91927885",
}) {
  const page = await createSession("https://magical-medical-form.netlify.app/");

  const fillForm = async () => {
    console.log("Filling Section 1...");
    await page.getByLabel("First Name", { exact: false }).fill(params.firstName);
    await page.getByLabel("Last Name", { exact: false }).fill(params.lastName);
    await page.getByLabel("Date of Birth", { exact: false }).fill(params.dateOfBirth);
    await page.getByLabel("Medical ID", { exact: false }).fill(params.medicalId);

    console.log("Filling Section 2...");
    await page.locator('select').first().selectOption("Male");
    await page.waitForTimeout(300);
    await page.locator('select').nth(1).selectOption("O+");
    await page.waitForTimeout(300);
    await page.getByPlaceholder("List any allergies...").fill("None");
    await page.getByPlaceholder("List current medications...").fill("None");

    console.log("Filling Section 3...");
    await page.getByLabel("Emergency Contact Name", { exact: false }).fill("Jane Doe");
    await page.getByLabel("Emergency Contact Phone", { exact: false }).fill("555-000-1234");

    console.log("Submitting...");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.waitForTimeout(2000);
    console.log("  Form submitted!");
  };

  const tools = {
    fillEntireForm: tool({
      description: "Fill out and submit the entire medical form",
      parameters: z.object({}),
      execute: async () => {
        await fillForm();
        return "Form filled and submitted successfully";
      },
    }),
  };

  const { text } = await generateText({
    model,
    tools,
    maxSteps: 3,
    system: `You are an agent. Call fillEntireForm to complete the task.`,
    prompt: `Fill out the medical form completely and submit it.`,
  });

  console.log(" Agent finished:", text);
}