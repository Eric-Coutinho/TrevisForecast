for /F "tokens=*" %%A in ('type "extensions.txt"') do (
  code --install-extension %%A
)