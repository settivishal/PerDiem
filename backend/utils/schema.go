package utils

import (
	"time"
	"golang.org/x/oauth2"

	"github.com/golang-jwt/jwt/v5"
)

type Credentials struct {
	Name     string `json:"name"`
	Password string `json:"password"`
	Email    string `json:"email"`
}

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

type RegisterResponse struct {
	Message string `json:"message"`
	Email   string `json:"email"`
	Name    string `json:"name"`
}

type LoginResponse struct {
	Message      string    `json:"message"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	AccessToken  string    `json:"access_token"`
	RefreshToken string    `json:"refresh_token"`
	ExpiresAt    time.Time `json:"expires_at"`
}

type ErrorResponse struct {
	Message string `json:"message"`
	Error   string `json:"error"`
}

type GoogleUser struct {
	ID            string `json:"id"`
	Email         string `json:"email"`
	VerifiedEmail bool   `json:"verified_email"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
}

type AuthController struct {
	Config *oauth2.Config
}
