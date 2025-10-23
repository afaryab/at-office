# Keycloak Configuration

This file contains the configuration for connecting to your Keycloak server.

## Setup Instructions

1. Replace the placeholder values in `src/services/authService.ts` with your actual Keycloak server details:
   - `url`: Your Keycloak server URL (e.g., `https://keycloak.example.com`)
   - `realm`: Your Keycloak realm name (e.g., `at-office`)
   - `clientId`: Your Keycloak client ID (e.g., `at-office-app`)

2. Configure your Keycloak server:
   - Create a new realm or use an existing one
   - Create a new client with the following settings:
     - Client Protocol: openid-connect
     - Access Type: public (for mobile apps)
     - Valid Redirect URIs: Add your app's redirect URI
     - Direct Access Grants Enabled: ON (to enable password grant)

3. Configure user registration:
   - Enable user registration in your realm settings if you want users to sign up
   - Or create users manually in the Keycloak admin console

## Default Configuration Location

The Keycloak configuration is located in:
`src/services/authService.ts`

Look for the `KEYCLOAK_CONFIG` constant and update it with your values.

## Example Configuration

```typescript
const KEYCLOAK_CONFIG: KeycloakConfig = {
  url: 'https://your-keycloak-server.com',
  realm: 'at-office',
  clientId: 'at-office-app',
};
```

## Testing

For development and testing purposes, you can:
1. Set up a local Keycloak instance using Docker
2. Use Keycloak's hosted service
3. Use a demo Keycloak server (not recommended for production)

## Security Notes

- Never commit real credentials to the repository
- Use environment variables for sensitive configuration
- Enable HTTPS for all production Keycloak endpoints
- Regularly update and rotate credentials
