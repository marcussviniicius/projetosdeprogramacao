$logPath = "caminho_para_arquivo_de_monitoracao"
$ultimoBackup = $null
$intervalo = 5  # segundos

function Escrever-Log($mensagem) {
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Add-Content $logPath "[$timestamp] $mensagem"
}

Escrever-Log "Monitor iniciado. Aguardando pendrive 'nome_pendrive'..."

while ($true) {
    try {
        $pendrive = Get-WmiObject Win32_Volume | Where-Object { $_.DriveType -eq 2 -and $_.Label -eq "nome_pendrive" }

        if ($pendrive) {
            if (-not $ultimoBackup -or $ultimoBackup -ne $pendrive.DeviceID) {
                Escrever-Log "Pendrive detectado em $($pendrive.DriveLetter). Iniciando backup..."

                # Fazendo o backup diretamente aqui
                $source = $pendrive.DriveLetter + "\"
                $destination = "caminho_destino_do_backup" + (Get-Date -Format "yyyyMMdd_HHmmss")

                try {
                    New-Item -ItemType Directory -Path $destination -Force | Out-Null
                    Copy-Item -Path ($source + "*") -Destination $destination -Recurse -Force -ErrorAction Stop
                    Escrever-Log "Backup concluído com sucesso para $destination"
                } catch {
                    Escrever-Log "ERRO durante o backup: $_"
                }

                $ultimoBackup = $pendrive.DeviceID
            }
        } else {
            $ultimoBackup = $null
        }
    } catch {
        Escrever-Log "Erro geral: $_"
    }

    Start-Sleep -Seconds $intervalo
}