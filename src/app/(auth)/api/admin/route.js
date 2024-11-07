import { NextResponse } from "next/server";
import { User } from "../../models/user";  // Assuming you're using mongoose and you have a User model

const adminCredentials = {
  id: process.env.ADMIN_ID,  // Store this securely in .env
  password: process.env.ADMIN_PASSWORD,  // Store this securely in .env
};

// Utility function to check authentication
function authenticate(req) {
    const id = req.nextUrl.searchParams.get("id");  // Use `get()` to extract the 'id' from URL
    const password = req.nextUrl.searchParams.get("password");  // Use `get()` to extract the 'password' from URL
  
  
  // Check if ID and password are correct
  if (!id || !password) {
    return { authenticated: false, message: "You Are Not Admin" };
  }

  if (id !== adminCredentials.id || password !== adminCredentials.password) {
    return { authenticated: false, message: "Invalid credentials" };
  }

  return { authenticated: true };
}

export async function GET(req, res) {
  try {
    // Authenticate the user based on URL parameters
    const authResult = authenticate(req);
    
    if (!authResult.authenticated) {
      return NextResponse.json({
        msg: authResult.message,
        success: false,
      });
    }

    // If authenticated, fetch users from the database
    const users = await User.find({}).select(`
        `);

    return NextResponse.json({
      msg: "Success",
      success: true,
      OnlyAdminAccess: true,
      users: users,
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({
      msg: "Error fetching users",
      success: false,
      error: error.message,
    });
  }
}
