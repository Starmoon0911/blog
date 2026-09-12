import supabaseAdmin from "../database/supabase";

type PermissionMode = "any" | "all";

export async function hasPermission(
  userId: string,
  permissions: string | string[],
  options: {
    mode?: PermissionMode;
  } = {},
): Promise<boolean> {
  const requiredPermissions =
    typeof permissions === "string" ? [permissions] : permissions;

  const mode = options.mode ?? "any";

  const { data, error } = await supabaseAdmin
    .from("user_permissions")
    .select("permission")
    .eq("user_id", userId)
    .in("permission", requiredPermissions);

  if (error) {
    throw error;
  }

  const userPermissions = new Set(data.map((item) => item.permission));

  if (userPermissions.has("admin")) {
    return true;
  }

  if (mode === "any") {
    return requiredPermissions.some((permission) =>
      userPermissions.has(permission),
    );
  }

  return requiredPermissions.every((permission) =>
    userPermissions.has(permission),
  );
}
