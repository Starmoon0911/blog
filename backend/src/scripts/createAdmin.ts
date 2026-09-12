import "dotenv/config";

import supabase from "../database/supabase";
import logger from "../utils/logger";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const username = process.env.ADMIN_NAME ?? "admin";

async function createAdmin() {
  if (!email || !password) {
    throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD is missing");
  }
  const { data: usersData, error: listError } =
    await supabase.auth.admin.listUsers();

  if (listError) {
    throw new Error(`Failed to list users: ${listError.message}`);
  }

  const existingUser = usersData.users.find(
    (user) => user.email?.toLowerCase() === email.toLowerCase(),
  );

  let userId: string;

  if (!existingUser) {
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        username,
      },
    });

    if (error) {
      throw new Error(`Failed to create admin user: ${error.message}`);
    }

    if (!data.user) {
      throw new Error("Admin user was not created");
    }

    userId = data.user.id;

    logger.info(`Created admin user: ${data.user.email}`);
  } else {
    userId = existingUser.id;

    logger.info(`Admin user already exists: ${existingUser.email}`);
  }

  const { data: existingPermission, error: permissionCheckError } =
    await supabase
      .from("user_permissions")
      .select("user_id, permission")
      .eq("user_id", userId)
      .eq("permission", "admin")
      .maybeSingle();

  if (permissionCheckError) {
    throw new Error(
      `Failed to check admin permission: ${permissionCheckError.message}`,
    );
  }

  if (!existingPermission) {
    const { error: permissionError } = await supabase
      .from("user_permissions")
      .insert({
        user_id: userId,
        permission: "admin",
      });

    if (permissionError) {
      throw new Error(
        `Failed to add admin permission: ${permissionError.message}`,
      );
    }

    logger.info("Successfully added admin permission");
  } else {
    logger.info("User already has admin permission");
  }

  logger.info("Admin initialization completed");
}

createAdmin().catch((error) => {
  logger.error(error);
  process.exit(1);
});
