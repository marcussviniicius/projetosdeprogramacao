# Definições
$usuario = "seu_usuario"
$senha = "sua_senha"
$nomeTarefa = "MonitorarPendrive"
$scriptPath = "caminho_para_arquivo_monitorar"
$comando = 'powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File "' + $scriptPath + '"'

# Salva a senha no gerenciador de credenciais (uma vez por máquina)
cmdkey /add:localhost /user:$usuario /pass:$senha

# Remove tarefa antiga se existir
schtasks.exe /Delete /TN $nomeTarefa /F | Out-Null

# Cria a nova tarefa
schtasks.exe /Create /TN $nomeTarefa /TR $comando /SC ONLOGON /RL HIGHEST /RU $usuario

Write-Host "Tarefa '$nomeTarefa' criada com sucesso com senha protegida."