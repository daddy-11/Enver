# =========================================================================
# ENVER AI TECH — MICROSOFT AZURE DEPLOYMENT RUNBOOK (POWERSHELL)
# =========================================================================
# Target Domain: enveraitech.com
# Stack: Node 20 / React 19 / Express / Vite / WebGL

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   ENVER AI TECH — AZURE DEPLOYMENT       " -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Check Azure CLI Installation
if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    Write-Host "[!] Azure CLI ('az') is not installed. Please install it from: https://aka.ms/installazurecliwindows" -ForegroundColor Red
    exit 1
}

# 2. Configuration Variables
$RESOURCE_GROUP = "enver-ai-rg"
$LOCATION = "centralindia" # or "eastus", "westeurope"
$ACR_NAME = "enverregistry$((Get-Random -Minimum 1000 -Maximum 9999))"
$CONTAINER_APP_NAME = "enver-web-app"
$ENVIRONMENT_NAME = "enver-container-env"

Write-Host "`n[Step 1/5] Checking Azure Login..." -ForegroundColor Green
$currentAccount = az account show --output json 2>$null
if (-not $currentAccount) {
    Write-Host "Please complete login in the opened browser window..." -ForegroundColor Yellow
    az login --output none
} else {
    $accountObj = $currentAccount | ConvertFrom-Json
    Write-Host "Already authenticated as $($accountObj.user.name) on subscription '$($accountObj.name)'" -ForegroundColor Green
}

Write-Host "`n[Step 2/5] Creating Resource Group '$RESOURCE_GROUP' in '$LOCATION'..." -ForegroundColor Green
az group create --name $RESOURCE_GROUP --location $LOCATION --output table

Write-Host "`n[Step 3/5] Deploying via Azure Container Apps..." -ForegroundColor Green
# Using 'az containerapp up' builds from local Dockerfile and provisions automatically
az containerapp up `
    --name $CONTAINER_APP_NAME `
    --resource-group $RESOURCE_GROUP `
    --location $LOCATION `
    --environment $ENVIRONMENT_NAME `
    --source . `
    --ingress external `
    --target-port 8080 `
    --env-vars "NODE_ENV=production" "PORT=8080" `
    --output table

Write-Host "`n[Step 4/5] Retrieving Application FQDN..." -ForegroundColor Green
$APP_URL = az containerapp show --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP --query "properties.configuration.ingress.fqdn" -o tsv

Write-Host "`n========================================================" -ForegroundColor Cyan
Write-Host " [SUCCESS] ENVER AI TECH DEPLOYED TO AZURE CONTAINER APPS!" -ForegroundColor Green
Write-Host " Live URL: https://$APP_URL" -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "`nTo bind your custom domain 'enveraitech.com':" -ForegroundColor White
Write-Host "1. Add CNAME record pointing 'enveraitech.com' to '$APP_URL'" -ForegroundColor Gray
Write-Host "2. Run: az containerapp hostname add --name $CONTAINER_APP_NAME --resource-group $RESOURCE_GROUP --hostname enveraitech.com" -ForegroundColor Gray
