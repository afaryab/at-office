# Contributing to At Office

Thank you for your interest in contributing to At Office! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Keep discussions professional

## Getting Started

1. **Fork the Repository**
   ```bash
   git clone https://github.com/afaryab/at-office.git
   cd at-office
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### 1. Make Changes
- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### 2. Test Your Changes
```bash
# Type checking
npx tsc --noEmit

# Run the app
npm start

# Test on different platforms
npm run android
npm run ios
npm run web
```

### 3. Commit Your Changes
```bash
git add .
git commit -m "feat: add new feature"
```

#### Commit Message Guidelines
Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add biometric login for iOS
fix: resolve check-in time display issue
docs: update README with setup instructions
```

### 4. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Pull Request Guidelines

### PR Title
Use the same format as commit messages:
```
feat: add user preferences screen
fix: resolve navigation crash on Android
```

### PR Description
Include:
- What changes were made
- Why the changes were needed
- How to test the changes
- Screenshots (for UI changes)
- Related issues (if any)

### PR Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Tested on multiple platforms (if applicable)
- [ ] TypeScript types are correct
- [ ] No security vulnerabilities introduced

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type
- Use meaningful variable names

### React Native
- Use functional components with hooks
- Follow React best practices
- Keep components focused and small
- Use proper prop types

### Naming Conventions
- **Components**: PascalCase (e.g., `LoginScreen.tsx`)
- **Files**: camelCase for utilities, PascalCase for components
- **Variables**: camelCase (e.g., `userName`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`)
- **Interfaces**: PascalCase with I prefix optional (e.g., `User`)

### File Organization
```
src/
├── screens/         # Screen components
├── components/      # Reusable components
├── navigation/      # Navigation setup
├── services/        # API and business logic
├── types/          # TypeScript types
├── utils/          # Helper functions
└── constants/      # App constants
```

## What to Contribute

### Good First Issues
- Documentation improvements
- UI/UX enhancements
- Bug fixes
- Test coverage
- Code comments
- Example configurations

### Feature Requests
Before implementing major features:
1. Open an issue to discuss
2. Wait for feedback
3. Get approval from maintainers
4. Then start implementation

### Bug Reports
When reporting bugs:
1. Check if issue already exists
2. Provide clear description
3. Include steps to reproduce
4. Add screenshots/videos
5. Mention environment details

## Testing

### Manual Testing
- Test on iOS, Android, and Web
- Test with and without Keycloak
- Test biometric on physical devices
- Test offline scenarios
- Test edge cases

### Automated Testing
- TypeScript type checking
- Linting (if configured)
- Build tests

## Documentation

### Update Documentation For:
- New features
- API changes
- Configuration changes
- Breaking changes
- Migration guides

### Documentation Files
- `README.md` - Main documentation
- `TESTING.md` - Testing guide
- `KEYCLOAK_SETUP.md` - Keycloak setup
- `CONTRIBUTING.md` - This file

## Security

### Report Security Issues
- **DO NOT** open public issues
- Email security concerns privately
- Provide detailed description
- Include proof of concept if possible

### Security Best Practices
- Never commit credentials
- Use environment variables
- Validate all inputs
- Sanitize user data
- Follow OWASP guidelines
- Keep dependencies updated

## Review Process

1. **Automated Checks**
   - TypeScript compilation
   - Build success
   - CodeQL security scan

2. **Manual Review**
   - Code quality
   - Documentation
   - Test coverage
   - Security concerns

3. **Feedback**
   - Address reviewer comments
   - Make requested changes
   - Re-request review

4. **Merge**
   - After approval
   - Squash commits if needed
   - Delete feature branch

## Getting Help

- **Questions**: Open a discussion on GitHub
- **Bugs**: Open an issue with details
- **Features**: Open an issue to discuss first
- **Chat**: Join our community (if available)

## Recognition

Contributors will be:
- Listed in the repository
- Credited in release notes
- Appreciated in the community

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort! 🎉
